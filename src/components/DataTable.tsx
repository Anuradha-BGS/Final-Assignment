import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, TablePagination, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../shared/config/context';
import '../assets/styles/table.scss';
import { createNotification } from '../shared/config/toast';

interface rowObj {
    id: string;
    name: string;
    description: string;
    tag: string;
    status: string;
}
const DataTable = () => {
    const history = useHistory();
    const context = useContext(Context);

    const [tableData, setTableData] = useState<Array<rowObj>>([]);

    useEffect(() => {
        setTableData(context.savedEula);
    }, [context.savedEula]);

    const handleViewDraftClick = (row: rowObj, index: number): void => {
        context.setCurrentEula(row);
        history.push({
            pathname: '/eula',
            state: { isViewDraftClick: true, index },
        });
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showActionId, setShowActionId] = useState(-1);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number
    ): void => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any): void => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const confirmDelete = (id: string): void => {
        if (context.savedEula.length > 0) {
            let remainingEula: rowObj[] = context.savedEula.filter(
                (eula: rowObj) => eula.id !== id
            );
            context.setSavedEula([...remainingEula]);
            createNotification(
                'success',
                'Draft has been deleted successfully'
            );
        } else {
            context.setSavedEula([]);
            createNotification(
                'success',
                'Draft has been deleted successfully'
            );
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>EULA name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Tags</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row: rowObj, index: number) => (
                            <TableRow
                                key={index}
                                hover
                                onMouseEnter={() => {
                                    setShowActionId(index);
                                }}
                                onMouseLeave={() => setShowActionId(-1)}
                            >
                                <TableCell>{row.name}</TableCell>
                                <TableCell className="tableCell">
                                    {row.description}
                                </TableCell>
                                <TableCell>{row.tag}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Box marginRight={'10px'}>
                                            <Typography
                                                className="viewDraft"
                                                onClick={() =>
                                                    handleViewDraftClick(
                                                        row,
                                                        index
                                                    )
                                                }
                                            >
                                                {row.status === 'Active'
                                                    ? ''
                                                    : 'View Draft'}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            {index === showActionId ? (
                                                <DeleteForeverIcon
                                                    fontSize="large"
                                                    color="error"
                                                    className="delete-icon"
                                                    onClick={() =>
                                                        confirmDelete(row.id)
                                                    }
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {tableData.length > 0 && (
                <Box style={{ background: 'white' }}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            )}
        </>
    );
};

export default DataTable;
