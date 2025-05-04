import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';
import FilmsScreen from './Films';
import SpaceshipsScreen from './Ships';
import PlanetsScreen from './Planets';
import {menu, Container} from 'semantic-ui-react';

export default function MainNavigator {
  return(
    <menu inverted>
      <Container>
        <link to='/>'>
        <Menu.Item name='Films'/>
        </link>
        <link to='/>'>
        <Menu.Item name='Planets'/>
        </link>
        <link to='/>'>
        <Menu.Item name='Ships'/>
        </link>

      </Container>
    </menu>
  ) 
  
  
}
