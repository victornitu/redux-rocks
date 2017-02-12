import React            from 'react';
import {
    Card,
    CardTitle
}                       from 'react-toolbox/lib/card';

export default function Winner(props) {
    const {winner} = props;
    return (
        <Card className="winner">
            <CardTitle title={`The winner is ${winner}`}/>
        </Card>
    );
}
