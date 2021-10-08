import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useCallback, useMemo } from "react";
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

const getColor = (id: string, cube?: Cube) => {
  const side = cube?.sides.find((side) => side.id === id);

  if (!side) {
    return `rgba(255, 255, 255, 1)`;
  }

  return `rgba(${side.red}, ${side.green}, ${side.blue}, 1)`;
};

const CubeSide = ({ color }: { color: string }) => (
  <div style={{ background: color, width: "100%", height: "100%" }}></div>
);

export const Cube = () => {
  const { data: initial } = useQuery<{ cube: Cube }>(get);
  const { data: updated } = useSubscription<{ cubeChange: Cube }>(subscribe);

  const cube = updated?.cubeChange ?? initial?.cube;

  // Update colors when we get new cube data
  const colors = useMemo(
    () => ({
      up: getColor("up", cube),
      down: getColor("down", cube),
      left: getColor("left", cube),
      right: getColor("right", cube),
      back: getColor("back", cube),
      front: getColor("front", cube),
    }),
    [cube]
  );

  // Force a new cube to get generated when colors are changed (we need to do this because of lib limitations)
  const ColoredCube = useCallback(
    () => (
      <Cube3d size={300} index="cube" key={Math.random()}>
        <CubeSide color={colors.up} />
        <CubeSide color={colors.down} />
        <CubeSide color={colors.left} />
        <CubeSide color={colors.right} />
        <CubeSide color={colors.back} />
        <CubeSide color={colors.front} />
      </Cube3d>
    ),
    [colors]
  );

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
        <ColoredCube />
      </div>
    </div>
  );
};
