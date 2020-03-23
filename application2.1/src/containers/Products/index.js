import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from './Product';
import './style.css';
import * as productActions from "../../store/actions/productActions";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


class Products extends Component {
    componentDidMount() {
        this.props.getProducts();
        console.log(this.props.products.products);
    }

    render() {

        return (
            <div className="Content">
                <div className="ContentBody">
                    <div className="MainContent">
                        <div className="ProductArea">
                            {
                                this.props.products.products.map(product => <Product
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    productImage={product.productImage}
                                />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(productActions.getProducts())
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
