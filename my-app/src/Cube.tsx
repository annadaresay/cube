import React from "react";
import "./App.css";
import { gql, useQuery, useSubscription } from "@apollo/client";

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

  return <h1>Test</h1>;
};

export default Cube;
