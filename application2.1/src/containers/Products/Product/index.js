import React from 'react';
import {Card} from 'antd';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const Product = props => {

    return (
            <div className="Product">
                <Card className="product-card-body"  style={{ width: 180 }}
                      cover={<img alt="example" src={props.productImage} />}>
                    <p>{props.name}</p>
                    <p>${props.price}</p>
                </Card>
            </div>
    );
}

export default Product;
