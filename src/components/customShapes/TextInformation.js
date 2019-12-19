import React from 'react';

import { Text } from 'react-konva';

export default function TextInformation({ textInformation }) {
  const text = textInformation.map(({ key, value }) => {
    return `${key}: ${value}`;
  });
  return <Text text={text}></Text>;
}
