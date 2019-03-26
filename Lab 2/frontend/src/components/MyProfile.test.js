import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MyProfile from './MyProfile'
import ViewGrades from './ViewGrades'


Enzyme.configure({ adapter: new Adapter() })
describe('Component: MyProfile', () => {
    it('should render', () => {
        expect(
            shallow(
                <MyProfile />
            ).length
         ).toEqual(1);
        
    })
})

describe('Component: ViewGrades', () => {
     it('should render', () => {
        expect(
            shallow(
                <ViewGrades />
            ).length
         ).toEqual(1);
     })
})