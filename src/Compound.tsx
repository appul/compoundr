import * as React from 'react';

type SubCompound<P, C> = (
  props: React.PropsWithChildren<P>,
  context: C
) => React.ReactElement | null;

export class Compound<C> {
  public context: React.Context<C>;

  constructor(context: React.Context<C>) {
    this.context = context;
  }

  protected provide(children: React.ReactNode, value: C) {
    const Provider = this.context.Provider;
    return <Provider value={value}>{children}</Provider>;
  }

  protected provider<P = {}>(
    valuer: (props: React.PropsWithChildren<P>) => C
  ): React.FC<P> {
    return props => {
      return this.provide(props.children, valuer(props));
    };
  }

  protected use<R>(consumer: (context: C) => R): R {
    const context = React.useContext(this.context);
    if (context === null) {
      throw new Error('Compound subcomponent requires a provided context');
    }
    return consumer(context);
  }

  protected bind<P>(sub: SubCompound<P, C>): React.FC<P> {
    return props => this.use(context => sub(props, context));
  }
}
