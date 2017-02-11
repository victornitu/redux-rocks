import React            from 'react';
import {
    Card,
    CardTitle
}                       from 'react-toolbox/lib/card';

export default class Winner extends React.PureComponent {

    render() {
        const {winner} = this.props;
        return (
            <Card>
                <CardTitle title={`The winner is ${winner}`}/>
            </Card>
        );
    }
}
