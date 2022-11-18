import React, { createContext } from 'react';

const Context = createContext({});

const Provider = (props: any) => {

  return (
    <Context.Provider value={props.contexts}>
      {props.children}
    </Context.Provider>
  );
}

export {Context, Provider};