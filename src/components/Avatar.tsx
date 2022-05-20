import React, { FC } from 'react';
import Blockies from 'react-blockies';
import './Avatar.css';
type AvatarProps = {
  seed: string;
};

const Avatar: FC<AvatarProps> = ({ seed }) => {
  return <Blockies seed={seed} scale={4.5} className="Avatar" />;
};

export default Avatar;
