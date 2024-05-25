import createstacknavigator from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Profile from '../app/details_view';
import ShoppingView from '../app/index';

const screens={
home : {
screen : ShoppingView
},
details:{
    screen:
    Profile}

}
const homestack = createstacknavigator(screens);

export default createAppContainer(homestack);