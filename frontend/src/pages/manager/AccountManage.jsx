import { useMemo, useEffect, } from 'react';
import {
    MRT_GlobalFilterTextInput,
    MRT_ToggleFiltersButton,
    MantineReactTable,
    getIsFirstColumn,
    getIsLastColumn,
    useMantineReactTable,
} from 'mantine-react-table';
import { Button, Flex } from '@mantine/core';
import { useState } from 'react';
import axios from "axios";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import './AccountManage.css'
import { Box, Menu, Text, Title } from '@mantine/core';
import { IconUserCircle, IconSend } from '@tabler/icons-react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModalInfo from './ModalInfo';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit'

const initData = {
    email: '',
    password: ''
}
const AccountManage = () => {

    const [listAcc, setListAcc] = useState('')
    const [detail, setdetail] = useState(false);
    const [listDetail, setListDetail] = useState({})
    const [popup,setPopup] = useState(false)
    const [data, setData] = useState()
    const [edit,setEdit] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/auth/getAll');
                setListAcc(response.data)
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        };
        fetchData();
    }, []);

    const onClickDetail = (data) => {
        setListDetail(data)
        setdetail(true)
    }

    const onClickDelete = async (data) => {
        if (!window.confirm('Xác nhận xóa!'))
            return;
        const newArr = listAcc.map((item) => {
            if (item.email === data.email)
                return null
            else
                return item
        }).filter(item => item !== null)
        setListAcc(newArr)
        await axios.post('http://localhost:4000/api/auth/delete', [data.email])
    }

    const onClickXoa = async (table) => {
        let rows = table.getSelectedRowModel().flatRows
        table.toggleAllRowsSelected(false)
        if (window.confirm('Xác nhận xóa!')) {
            var ids = [];
            let data = listAcc;
            for (let row of rows) {
                ids = [...ids, row.original.email];
                data = data.filter((obj) => obj.email !== row.original.email);
            }
            setListAcc(data)
            await axios.post('http://localhost:4000/api/auth/delete', ids);
            table.toggleAllRowsSelected(false)
            alert('Đã xóa');
        }
        else table.toggleAllRowsSelected(false)
    }


    const columns = useMemo(
        () => [
            {
                accessorKey: 'email',
                header: 'Email',
                maxSize: 200
            },
            {
                accessorKey: 'name',
                header: 'Tên người dùng',
            },
            {
                accessorKey: 'role',
                header: 'Vai trò'
            },
            {
                header: 'Action',
                size: 80, minSize: 80, maxSize: 80,
                Cell: ({ row }) => (
                    <div style={{ display: 'flex' }}>
                        <div className='w-100 ps-2'><DriveFileRenameOutlineIcon className="button-scale" onClick={()=>{setData({...row.original,password:''});console.log("data",data);setEdit(true)}} /></div>
                        <div className='w-100 ps-2'><DeleteForeverIcon className="button-scale" onClick={() => onClickDelete(row.original)} /></div>
                        <div className='w-100 ps-2'><InfoIcon className="button-scale" onClick={() => onClickDetail(row.original)} /></div>
                    </div>
                )
            }
        ],
        [listAcc],
    );

    const table = useMantineReactTable({
        columns,
        data: listAcc, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        enableStickyHeader: true, // static header
        enableRowSelection: true,
        enablePinning: true,
        enableRowActions: false,
        positionToolbarAlertBanner: 'bottom',
        paginationDisplayMode: 'pages',
        mantineTableContainerProps: {
            sx: {
                maxHeight: '72vh',
                width: '100%'
            },
        },
        mantineSearchTextInputProps: {
            placeholder: 'Search',
        },
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: 'Action',
                size: 50,
            },
        },
        renderTopToolbar: ({ table }) => {
            return (
                <Flex p="md" justify="space-between" >

                    <Flex gap='8px'>
                        <Button color="green" onClick={()=>{setData(initData); setPopup(true)}}
                            disabled={(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())}
                        >Thêm</Button>

                        <Button color="red" variant="filled" onClick={() => onClickXoa(table)}
                            disabled={!(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected())}
                        >Xóa</Button>
                    </Flex>

                    <Flex gap='8px'>
                        <MRT_ToggleFiltersButton table={table} />
                        <MRT_GlobalFilterTextInput table={table} />
                    </Flex>
                </Flex>
            );
        },
    });

    return (
        <div style={{ padding: 10 }}>
            <MantineReactTable table={table} />
            {popup?<ModalAdd setList={setListAcc} data={data} close={()=>setPopup(false)}  />:<></>}
            {edit?<ModalEdit setList={setListAcc} data={data} close={()=>setEdit(false)}  />:<></>}
            {detail ? <ModalInfo data={listDetail} close={() => setdetail(false)} /> : <></>}
        </div>
    );
};

export default AccountManage;
