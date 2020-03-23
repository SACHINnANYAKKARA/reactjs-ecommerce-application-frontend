import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from './Product';
import './style.css';
import Header from '../../components/Header/Header';
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
    }

    render() {

        return (
            <React.Fragment>
                <Header />
                <div className="Content">
                    <div className="ContentBody">
                        <div className="MainContent">
                            <div className="ProductArea">
                                {
                                    this.props.products.products.map(product => <Product
                                        key={product.id}
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
            </React.Fragment>
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
