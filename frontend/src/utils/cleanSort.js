import { useContext } from "react";
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

export const cleanSort = observer(() => {
    const { sort } = useContext(Context);

    sort.setFieldNames([]);
    sort.setFieldName('');
    sort.setTypeSort('');
})