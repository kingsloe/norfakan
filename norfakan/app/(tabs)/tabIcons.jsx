import FontAwesome from '@expo/vector-icons/FontAwesome';

import Home from './home';
import Upcoming from './upcoming';
import Completed from './completed';
import Profile from './profile';

const IconColor = ({name}) => {
    return ({ color }) => <FontAwesome size={25} name={name} color={color} />
  }
  
const TabIcons = [
{
    name: 'home',
    title: 'Home',
    component: Home,
    iconName: 'home'
},
{
    name: 'upcoming',
    title: 'Upcoming',
    component: Upcoming,
    iconName: 'calendar'
},
{
    name: 'completed',
    title: 'Completed',
    component: Completed,
    iconName: 'check'
},
{
    name: 'profile',
    title: 'Profile',
    component: Profile,
    iconName: 'user'
},
]

export { IconColor, TabIcons }