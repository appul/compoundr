import * as React from 'react';
import { Compound } from './Compound';

export interface IToggle {
  toggled: boolean;
  setToggled(toggled: boolean): void;
}

export const ToggleContext = React.createContext<IToggle>(null);

export class Toggle extends Compound<IToggle> {
  public New: React.FC<{ initial: boolean }> = ({ children, initial }) => {
    const [toggled, setToggled] = React.useState(initial);
    return this.provide(children, { toggled, setToggled });
  };

  public On: React.FC = ({ children }) => {
    return this.use(({ toggled }) => {
      return <>{toggled ? children : null}</>;
    });
  };
  public Off: React.FC = ({ children }) => {
    return this.use(({ toggled }) => {
      return <>{toggled ? null : children}</>;
    });
  };

  public State: React.FC<{ on: React.ReactNode; off: React.ReactNode }> = ({
    on,
    off,
  }) => this.use(({ toggled }) => <>{toggled ? on : off}</>);

  public Toggle: React.FC<{
    children: (context: IToggle) => React.ReactNode;
  }> = ({ children }) => this.use(context => <>{children(context)}</>);
}

export class Toggle2 extends Compound<IToggle> {
  public New = this.provider<{ initial: boolean }>(({ initial }) => {
    const [toggled, setToggled] = React.useState(initial);
    return { toggled, setToggled };
  });

  public On = this.bind(({ children }, { toggled }) => (
    <>{toggled ? children : null}</>
  ));

  public Off = this.bind(({ children }, { toggled }) => (
    <>{toggled ? null : children}</>
  ));

  public State = this.bind<{ on: React.ReactNode; off: React.ReactNode }>(
    ({ on, off }, { toggled }) => <>{toggled ? on : off}</>
  );

  public Toggle = this.bind<{
    children: (context: IToggle) => React.ReactNode;
  }>(({ children }, context) => <>{children(context)}</>);
}
