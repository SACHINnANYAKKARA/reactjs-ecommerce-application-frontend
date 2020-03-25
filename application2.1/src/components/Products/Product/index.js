import React from 'react';
import {Card} from 'antd';

const Product = props => {

    return (
        <div className="Product">
            <Card className="product-card-body" style={{width: 180}}
                  cover={<img alt="example" src={props.productImage}/>}>
                <h3>{props.name}</h3>
                <h3>${props.price}</h3>
            </Card>
        </div>
    );
}

export default Product;
