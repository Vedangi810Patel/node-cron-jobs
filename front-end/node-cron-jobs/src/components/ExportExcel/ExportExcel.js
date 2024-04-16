import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

const AllProducts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/AllProducts');
            console.log('Response data:', response.data);
            if (Array.isArray(response.data)) {
                // Combine arrays of records into a single array and remove duplicates
                const combinedData = response.data.flat().filter((value, index, self) =>
                    index === self.findIndex(t => (
                        t.product_id === value.product_id
                    ))
                );
                // Add unique identifier to each row
                const dataWithId = combinedData.map((row, index) => ({ ...row, id: index + 1 }));
                setData(dataWithId);
            } else {
                console.error('Error: Response data is not an array');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const exportToExcel = async () => {
        try {
            const filteredData = data.map(({ product_name, product_desc, price, discounted_price, product_sku, category_name }) => ({
                product_name,
                product_desc,
                price,
                discounted_price,
                product_sku,
                category_name
            }));

            // Convert the data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(filteredData);

            // Create a workbook and add the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

            // Generate unique timestamp for filename
            const timestamp = new Date().toISOString().replace(/:/g, '-');

            // Save the workbook as a file with unique timestamp
            XLSX.writeFile(workbook, `products_${timestamp}.xlsx`);
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };


    const columns = [
        { field: 'product_id', headerName: 'ID', width: 100 },
        { field: 'product_name', headerName: 'Name', width: 200 },
        { field: 'product_desc', headerName: 'Description', width: 300 },
        { field: 'price', headerName: 'Price', width: 120 },
        { field: 'discount_percent', headerName: 'Discount', width: 120 },
        { field: 'discounted_price', headerName: 'Discounted Price', width: 150 },
        { field: 'product_sku', headerName: 'SKU', width: 150 },
        { field: 'variant_id', headerName: 'Variant ID', width: 150 },
        { field: 'category_name', headerName: 'Category Name', width: 120 },
    ];

    return (
        <div style={{ height: 'calc(100vh - 64px)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>

            <div style={{ height: 'calc(100% - 50px)', width: '90%', margin: '10px', paddingTop: '64px' }}>
                <DataGrid 
                    rows={data}
                    columns={columns} 
                    pagination={false} 
                />
            </div>

            <button style={{ height: '50px', width: '20%', margin: '10px' }} onClick={exportToExcel}>Export to Excel</button>

        </div>
    );
};

export default AllProducts;
