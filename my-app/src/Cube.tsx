import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import Cube3d from "react-3d-cube";
import "./App.css";

interface Cube {
  id: string;
  sides: { id: string; red: number; green: number; blue: number }[];
}

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

const getColor = (id: string, cube: Cube) => {
  const side = cube.sides.find((side) => side.id === id);

  if (!side) {
    return undefined;
  }

  return `rgba(${side.red}, ${side.green}, ${side.blue}, 1)`;
};

const CubeSide = ({ cube, id }: { cube: Cube; id: string }) => {
  const color = getColor(id, cube);

  return (
    <div style={{ background: color, width: "100%", height: "100%" }}></div>
  );
};

export const Cube = () => {
  const { data: initial } = useQuery<{ cube: Cube }>(get);
  const { data: updated } = useSubscription<{ cubeChange: Cube }>(subscribe);

  const cube = updated?.cubeChange ?? initial?.cube;

  useEffect(() => {
    console.log("new cube: ", cube);
  }, [cube]);

  if (!cube) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          width: 300,
          height: 300,
        }}
      >
        <Cube3d size={300} index="front">
          <CubeSide cube={cube} id="up" />
          <CubeSide cube={cube} id="down" />
          <CubeSide cube={cube} id="left" />
          <CubeSide cube={cube} id="right" />
          <CubeSide cube={cube} id="back" />
          <CubeSide cube={cube} id="front" />
        </Cube3d>
      </div>
    </div>
  );
};
