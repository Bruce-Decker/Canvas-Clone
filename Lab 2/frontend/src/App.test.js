// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MyProfile from './components/MyProfile'
import ViewGrades from './components/ViewGrades'
import CourseProfile from './components/CourseProfile'
import RegisterCourse from './components/RegisterCourse'
import Login from './components/Login'
import Banner from './components/Banner'
import { Link } from 'react-router';



Enzyme.configure({ adapter: new Adapter() })
describe('Component: Login', () => {
    it('should render', () => {
        expect(
            shallow(
                <Login />
            ).length
         ).toEqual(1);
        
    })

    it('should render in debug mode', () => {
        const component = shallow(<MyProfile debug />);
      
        expect(component).toMatchSnapshot();
      });

      it('should render text from an array', () => {
        const record = ['user1', 'user2', 'user3'];
        const component = shallow(<MyProfile value={record} />);
        expect(component).toMatchSnapshot();
      });

   
})

Enzyme.configure({ adapter: new Adapter() })
describe('Component: MyProfile', () => {
    it('should render', () => {
        expect(
            shallow(
                <MyProfile />
            ).length
         ).toEqual(1);
        
    })

    it('should render in debug mode', () => {
        const component = shallow(<MyProfile debug />);
      
        expect(component).toMatchSnapshot();
      });

      it('should render text from an array', () => {
        const record = ['user1', 'user2', 'user3'];
        const component = shallow(<MyProfile value={record} />);
        expect(component).toMatchSnapshot();
      });

   
})

describe('Component: ViewGrades', () => {
     it('should render', () => {
        expect(
            shallow(
                <ViewGrades />
            ).length
         ).toEqual(1);
     })

     it('should render in debug mode', () => {
        const component = shallow(<ViewGrades debug />);
      
        expect(component).toMatchSnapshot();
      });

      it('should render text from an array', () => {
        const record = ['user1', 'user2', 'user3'];
        const component = shallow(<ViewGrades value={record} />);
        expect(component).toMatchSnapshot();
      });

    
})

describe('Component: CourseProfile', () => {
  
  it('should render', () => {
     expect(
         shallow(
             <CourseProfile />
         ).length
      ).toEqual(1);
  })

  it('should render in debug mode', () => {
    const component = shallow(<CourseProfile debug />);
  
    expect(component).toMatchSnapshot();
  });

  it('should render text from an array', () => {
    const record = ['user1', 'user2', 'user3'];
    const component = shallow(<CourseProfile value={record} />);
    expect(component).toMatchSnapshot();
  });

})

describe('Component: RegisterCourse', () => {
  
  it('should render', () => {
     expect(
         shallow(
             <RegisterCourse />
         ).length
      ).toEqual(1);
  })
  it('should render in debug mode', () => {
    const component = shallow(<RegisterCourse debug />);
  
    expect(component).toMatchSnapshot();
  });

  it('should render text from an array', () => {
    const record = ['user1', 'user2', 'user3'];
    const component = shallow(<RegisterCourse value={record} />);
    expect(component).toMatchSnapshot();
  });

 
  
})


