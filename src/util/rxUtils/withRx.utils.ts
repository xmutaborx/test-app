import { Component, ComponentClass, ComponentType, createElement, PropsWithChildren } from 'react';
import { Observable, BehaviorSubject, Subscription, animationFrameScheduler } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

const hoistNonReactStatics = require('hoist-non-react-statics'); // eslint-disable-line

export type ComponentDecorator<P> = (Target: ComponentType<P>) => ComponentClass<P>;
export type WithRXSelectorResult<P> = {
	props$: Observable<Partial<P>>;
	effects$?: Observable<unknown>;
};
export type WithRXSelector<P> = (props$: Observable<Readonly<P>>) => WithRXSelectorResult<P>;

export function withRX<P extends object = never>(select: WithRXSelector<P>): ComponentDecorator<P> {
	return Target => {
		class WithRX extends Component<P> {
			static displayName = `WithRX(${Target.displayName || Target.name})`;

			private props$ = new BehaviorSubject(this.props);
			private selectResult = select(this.props$.asObservable());
			private input$ = this.selectResult.props$;
			private effect$ = this.selectResult.effects$;
			private inputSubscription: Subscription | null = null;
			private effectSubscription: Subscription | null = null;


			UNSAFE_componentWillReceiveProps(props: Readonly<PropsWithChildren<P>>) {
				this.props$.next(props);
			}

			componentDidMount() {
				this.inputSubscription = this.input$
					.pipe(subscribeOn(animationFrameScheduler))
					.subscribe(state => this.setState(state));
				if (this.effect$ && this.effectSubscription ) {
					this.effectSubscription = this.effect$.pipe(subscribeOn(animationFrameScheduler)).subscribe();
				}
			}

			componentWillUnmount() {
				if (this.inputSubscription) {
					this.inputSubscription.unsubscribe();
				}
				if (this.effectSubscription) {
					this.effectSubscription.unsubscribe();
				}
			}

			render() {
				return createElement(Target, Object.assign({}, this.props, this.state));
			}
		}

		hoistNonReactStatics(WithRX, Target);

		return WithRX;
	};
}
