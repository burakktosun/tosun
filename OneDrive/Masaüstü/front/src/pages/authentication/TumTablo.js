/*eslint-disable*/

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

import axios from 'axios';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';

// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot }) => {
    const [recentStock, setRecentStock] = useState([]);
    const [historyStock, setHistoryStock] = useState([]);
    const [page, setPage] = useState(0); // sayfa numarasını tutmak için state
    const [rowsPerPage, setRowsPerPage] = useState(5); // her sayfadaki satır sayısını tutmak için state

    useEffect(() => {
        if (slot === 'month') {
            axios
                .get('http://localhost:4040/v1/api/recent-stock')
                .then((response) => {
                    setRecentStock(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (slot === 'week') {
            axios
                .get('http://localhost:4040/v1/api/sold-stock')
                .then((response) => {
                    setHistoryStock(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [slot]);

    return (
        <div>
            <Pagination
    total={slot === 'month' ? recentStock.length : historyStock.length}
    current={page}
    display={perPage}
    onChange={(pageNum) => setPage(pageNum)}
        ></Pagination>
            {slot === 'month' && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ürün Adı</TableCell>
                                <TableCell>Fatura Tarihi</TableCell>
                                <TableCell>Fatura Numarası</TableCell>
                                <TableCell>Nerden</TableCell>
                                <TableCell>Tutar</TableCell>
                                <TableCell>Açıklama</TableCell>
                                <TableCell>Seri No</TableCell>
                                <TableCell>Lot No</TableCell>
                                <TableCell>Miad</TableCell>
                                <TableCell>Adet</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentStock.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.itemName}</TableCell>
                                    <TableCell>{item.invoiceDate}</TableCell>
                                    <TableCell>{item.invoiceNo}</TableCell>
                                    <TableCell>{item.orderStatus}</TableCell>
                                    <TableCell>{item.boughtPrice}</TableCell>
                                    <TableCell>{item.comment}</TableCell>
                                    <TableCell>{item.serial}</TableCell>
                                    <TableCell>{item.lot}</TableCell>
                                    <TableCell>{item.expirationDate}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {slot === 'week' && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ürün Adı</TableCell>
                                <TableCell>Nerede</TableCell>
                                <TableCell>Çıkış Tarihi</TableCell>
                                <TableCell>Tutar</TableCell>
                                <TableCell>Durum</TableCell>
                                <TableCell>Adet</TableCell>
                                <TableCell>Seri</TableCell>
                                <TableCell>Lot</TableCell>
                                <TableCell>Miad</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historyStock.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.itemName}</TableCell>
                                    <TableCell>{item.customerInfo}</TableCell>
                                    <TableCell>{item.orderDate}</TableCell>
                                    <TableCell>{item.invoiceAmount}</TableCell>
                                    <TableCell>{item.ordersStatusE}</TableCell>
                                    <TableCell>{item.quantitY}</TableCell>
                                    <TableCell>{item.serialNo}</TableCell>
                                    <TableCell>{item.lot}</TableCell>
                                    <TableCell>{item.expirationDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default IncomeAreaChart;
