import { CartRespIcon } from "../icons/CartRespIcon";
import { ChatIcon } from "../icons/Chaticon";
import { HomeIcon } from "../icons/HomeIcon";
import { LogInRespIcon } from "../icons/LogInRespIcon";
import { SearchRespIcon } from "../icons/SearchRespIcon";

export const respNavBar = [
    {
        id: 1,
        title: 'Home',
        icon: HomeIcon,
        route: '/'
    },
    {
        id: 2,
        title: 'Search',
        icon: SearchRespIcon,
        route: ''
    },
    {
        id: 3,
        title: 'Cart',
        icon: CartRespIcon,
        route: '/cart'
    },
    {
        id: 4,
        title: 'Chat',
        icon: ChatIcon,
        route: '/chat'
    },
    {
        id: 5,
        title: 'Log in',
        icon: LogInRespIcon,
        route: '/login'
    },
]