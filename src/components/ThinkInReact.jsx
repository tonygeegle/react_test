import React, { Component } from 'react'

const goods = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

function ProductRow(props) {
    const { product: { name, price, stocked } } = props;
    const pname = stocked ? name : <span style={{ color: 'red' }}> {name} </span>;

    return (
        <tr>
            <td>
                {pname}
            </td>
            <td>
                {price}
            </td>
        </tr>
    )
}

function ProductCategoryRow(props) {
    const { category } = props;
    return (
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    )
}

function ProductTable(props) {
    const { products, filterText, inStockOnly } = props;
    let lastCategory = null;
    const tableItems = [];

    products.forEach(Item => {

        if (filterText && Item.name.indexOf(filterText) === -1) {
            return;
        }

        if (inStockOnly && !Item.stocked) {
            return
        }

        Item.category !== lastCategory && tableItems.push(<ProductCategoryRow category={Item.category} key={Item.category} />);
        tableItems.push(<ProductRow product={Item} key={Item.name} />);
        lastCategory = Item.category;
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </table>
        </div>
    )
}

function SearchBar(props) {
    const { filterText, inStockOnly, handleFilterTextChange, handleInStockChange } = props;

    return (
        <form>
            <input type="text" value={filterText} onChange={handleFilterTextChange} placeholder="Search..." />
            <p>
                <input type="checkbox" checked={inStockOnly} onChange={handleInStockChange} />
                {' '}
                Only show products in stock
            </p>
        </form>
    )
}

export default class FilterableProductTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            goods: [],
            filterText: '',
            inStockOnly: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                goods: goods
            })
        }, 2000);
    }

    handleFilterTextChange = e => {
        const filterText = e.target.value;
        this.setState({
            filterText
        });
    }

    handleInStockChange = e => {
        const inStockOnly = e.target.checked;
        // const inStockOnly = e.target.value;
        console.log(inStockOnly);
        this.setState({
            inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    handleFilterTextChange={this.handleFilterTextChange}
                    handleInStockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={this.state.goods}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        )
    }
}
