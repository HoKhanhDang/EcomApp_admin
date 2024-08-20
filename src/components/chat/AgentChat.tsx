/* eslint-disable */
import React, { Component, createRef } from 'react'
import { CometChat } from '@cometchat-pro/chat'
import MDSpinner from 'react-md-spinner'
const config = {
    appID: '2625228e90b6d2ce',
    agentUID: '1723871226111',
    server: 'https://server-test-dunks-projects.vercel.app'
}

const agentUID = config.agentUID
const AGENT_MESSAGE_LISTENER_KEY = 'agent-listener'
const limit = 30

interface Chat {
    id: string
    sender: { uid: string }
    text: string
    sentAt: number
}

interface Customer {
    uid: string
    name: string
}

interface ChatBoxProps {
    chat: Chat[]
    chatIsLoading: boolean
}

class ChatBox extends Component<ChatBoxProps> {
    chatEndRef = createRef<HTMLDivElement>();

    scrollToBottom = () => {
        if (this.chatEndRef.current) {
            this.chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    componentDidUpdate(prevProps: ChatBoxProps) {
        if (prevProps.chat !== this.props.chat) {
            this.scrollToBottom();
        }
    }

    render() {
        const { chat, chatIsLoading } = this.props
        if (chatIsLoading) {
            return (
                <div className='flex justify-center items-center h-full'>
                    <MDSpinner size='72' />
                </div>
            )
        } else {
            return (
                <div className='w-full'>
                    {chat.map((chat) => {
                        const date = new Date(chat?.sentAt * 1000)
                        const formattedDate = date.toLocaleTimeString()
                        return (
                            <div key={chat?.id} className='overflow-hidden'>
                                <div
                                    className={`${
                                        chat?.sender.uid === agentUID ? 'float-right flex flex-col' : 'float-left'
                                    }`}
                                >
                                    <div
                                        className={`${
                                            chat?.sender.uid === agentUID
                                                ? 'text-white bg-blue-400 w-auto h-auto p-3 rounded-[20px] mr-2 mb-1'
                                                : 'text-white bg-gray-400 w-auto h-auto p-3 rounded-[20px] ml-2 mb-1'
                                        }`}
                                    >
                                        {chat?.text}
                                    </div>
                                    <div
                                        className={`${
                                            chat?.sender.uid === agentUID
                                                ? 'text-gray-400 text-right text-[10px] mr-3 mb-1'
                                                : 'text-gray-400 text-left text-[10px] ml-3 mb-1'
                                        }`}
                                    >
                                        {formattedDate}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={this.chatEndRef} />
                </div>
            )
        }
    }
}

interface CustomerListProps {
    customers: Customer[]
    customerIsLoading: boolean
    selectedCustomer: string
    selectCustomer: (uid: string) => void
}

class CustomerList extends Component<CustomerListProps> {
    render() {
        const { customers, customerIsLoading, selectedCustomer } = this.props
        const newestCustomers = customers?.sort((a, b) => b.uid.localeCompare(a.uid))
        if (customerIsLoading) {
            return (
                <div className='flex justify-center items-center h-full'>
                    <MDSpinner size='72' />
                </div>
            )
        } else {
            return (
                <ul className='list-none w-full flex flex-col justify-center items-center  gap-2'>
                    {newestCustomers?.map((customer) => {
                        return (
                            <li
                                key={customer.uid}
                                className={`p-2 w-[90%] border-t rounded-[20px] hover:bg-blue-300 hover:text-white cursor-pointer ${
                                    customer.uid === selectedCustomer ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                }`}
                                onClick={() => this.props.selectCustomer(customer.uid)}
                            >
                                {customer.name}
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }
}

interface AgentState {
    customers: Customer[]
    selectedCustomer: string
    chat: Chat[]
    chatIsLoading: boolean
    customerIsLoading: boolean
}

class Agent extends Component<{}, AgentState> {
    state: AgentState = {
        customers: [],
        selectedCustomer: '',
        chat: [],
        chatIsLoading: false,
        customerIsLoading: true
    }

    messageRef = createRef<HTMLInputElement>()

    fetchAuthToken = async (uid: string): Promise<string> => {
        console.log('fetchAuthToken', { uid })
        const response = await fetch(`${config.server}/api/auth?uid=${uid}`)
        console.log('response', response)
        const result = await response.json()
        return result
    }

    componentDidMount() {
        this.fetchAuthToken(agentUID).then(
            (authToken) => {
                console.log('auth token fetched', authToken)
                try {
                    CometChat.login(authToken).then((user) => {
                        console.log('Login successfully:', { user })
                        this.fetchUsers().then((result) => {
                            this.setState({
                                customers: result,
                                customerIsLoading: false
                            })
                        })

                        CometChat.addMessageListener(
                            AGENT_MESSAGE_LISTENER_KEY,
                            new CometChat.MessageListener({
                                onTextMessageReceived: (message) => {
                                    const { customers, selectedCustomer, chat } = this.state
                                    console.log('Incoming Message Log', {
                                        message
                                    })
                                    if (selectedCustomer === message.sender.uid) {
                                        chat.push(message)
                                        this.setState({
                                            chat
                                        })
                                    } else {
                                        const aRegisteredCustomer = customers.filter((customer) => {
                                            return customer.uid === message.sender.uid
                                        })
                                        if (!aRegisteredCustomer.length) {
                                            this.setState((prevState) => ({
                                                customers: [
                                                    ...prevState.customers,
                                                    { uid: message.sender.uid, name: message.sender.name }
                                                ]
                                            }))
                                        }
                                    }
                                }
                            })
                        )
                    })
                } catch (err) {
                    console.log('Initialization failed with error:', err)
                }
            },
            (error) => {
                console.log('Initialization failed with error:', error)
            }
        )
    }

    fetchUsers = async (): Promise<Customer[]> => {
        const response = await fetch(`${config.server}/api/users`)
        const result = await response.json()
        return result
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const message = this.messageRef.current?.value

        if (message) {
            const textMessage = new CometChat.TextMessage(
                this.state.selectedCustomer,
                message,
                CometChat.RECEIVER_TYPE.USER
            )

            CometChat.sendMessage(textMessage).then(
                (message) => {
                    let { chat } = this.state
                    console.log('Message sent successfully:', message)
                    chat.push(message)
                    this.setState({
                        chat
                    })
                },
                (error) => {
                    console.log('Message sending failed with error:', error)
                }
            )
            if (this.messageRef.current) {
                this.messageRef.current.value = ''
            }
        }
    }

    selectCustomer = (uid: string) => {
        this.setState(
            {
                selectedCustomer: uid
            },
            () => {
                this.fetchPreviousMessage(uid)
            }
        )
    }

    fetchPreviousMessage = (uid: string) => {
        this.setState(
            {
                chat: [],
                chatIsLoading: true
            },
            () => {
                const messagesRequest = new CometChat.MessagesRequestBuilder().setUID(uid).setLimit(limit).build()
                messagesRequest.fetchPrevious().then(
                    (messages) => {
                        console.log('Message list fetched:', messages)
                        this.setState({
                            chat: messages,
                            chatIsLoading: false
                        })
                    },
                    (error) => {
                        console.log('Message fetching failed with error:', error)
                    }
                )
            }
        )
    }

    render() {
        return (
            <div className='flex w-full h-full z-50 gap-3'>
                <div className='w-1/3 h-full bg-white rounded-[30px]'>
                    <div className='p-3 h-[10%] w-full flex justify-center'>
                        <span className='text-[30px] font-semibold'>Chats</span>
                    </div>
                    <div className='h-auto overflow-auto'>
                        <CustomerList {...this.state} selectCustomer={this.selectCustomer} />
                    </div>
                </div>
                <div className='w-2/3 bg-white rounded-[20px] h-full'>
                    <div className='pt-5 h-[90%] overflow-auto'>
                        <ChatBox {...this.state} />
                    </div>
                    <div className='bg-gray-100 px-[20px] w-full h-[10%] rounded-b-[20px]'>
                        <form
                            className='flex w-full h-full justify-center items-center gap-2 '
                            onSubmit={this.handleSubmit}
                        >
                            <div className='w-3/4 p-1'>
                                <input
                                    id='text'
                                    className='w-full border rounded-[20px] p-2'
                                    type='text'
                                    name='text'
                                    ref={this.messageRef}
                                    placeholder='Type a message...'
                                />
                            </div>
                            <div className='w-1/4 p-1'>
                                <button
                                    className='btn btn-outline-secondary bg-blue-300 rounded-md border w-full p-2'
                                    title='Send'
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        CometChat.removeMessageListener(AGENT_MESSAGE_LISTENER_KEY)
        CometChat.logout()
    }
}

export default Agent
