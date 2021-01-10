import * as React from 'react';
import './Hello.scss'

export interface IAppProps {
    compiler: string,
    framework: string,
    bundler: string
}

export interface IAppState {
	name: string;
}

export class Hello extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
		super(props);
		this.state = {
			name: null
		};
	}

    async componentDidMount() {
		try {
			let r = await fetch('/api/v1/hello?q=Max');
            let data = await r.json();
			this.setState({ ...data });
		} catch (error) {
			console.log(error);
		}
    }
    
    render() {
    return <h1>Hellox {this.state.name}. This is a <area shape="" coords="" href="" alt=""/> {this.props.framework} application using {this.props.compiler} with {this.props.bundler}</h1>
    }
}