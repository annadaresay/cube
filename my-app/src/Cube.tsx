import React from "react";
import "./App.css";
import { gql, useQuery, useSubscription } from "@apollo/client";
import Cube3d from 'react-3d-cube';

const get = gql`
  query Query {
    cube {
      id
      sides {
        id
        blue
        red
        green
      }
    }
  }
`;

const subscribe = gql`
  subscription Subscribe {
    cubeChange {
      id
      sides {
        id
        red
        green
        blue
      }
    }
  }
`;

const Cube = () => {
  const { data: getData } = useQuery(get);
  const { data: subscribeData } = useSubscription(subscribe);

  console.log("getData: ", getData);
  console.log("subscribeData: ", subscribeData);

  return (
    <div>
          <h1>react-3d-cube</h1>
          <h2>no children</h2>
          <div
          style={{
              width: 300,
              height: 300
          }}
          >
          <Cube3d size={300} index="front" />
          </div>
          <h2>set children</h2>
          <div
          style={{
              width: 300,
              height: 300
          }}
          >
          <Cube3d size={300} index="front">
              <div>front</div>
              <div>right</div>
              <div>back</div>
              <div>left</div>
              <div>top</div>
              <div>bottom</div>
          </Cube3d>
          </div>
    </div>
  );
};

export default Cube;



