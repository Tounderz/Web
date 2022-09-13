import { fetchSearchUsers } from "../http/searchApi";
import { useInput } from "../http/validateApi";
import { IS_NUMBER, PAGE_FIRST } from "../utils/const";

export const SearchTableUser = async (searchBy, searchParameter) => {
        const email = useInput('', {isEmail: true});
        const phone = useInput('', {isPhone: true});

        console.log(searchBy, searchParameter);
        switch(searchBy) {
            case 'Id':
                console.log(searchParameter);
                if (!IS_NUMBER.test(searchParameter)) {
                    return null;
                }
            break;
            case 'Phone':
                phone(searchParameter);
                if (phone.isDirty && phone.isNumberError) {
                    return null;
                }
                break;
            case 'Email':
                email(searchParameter);
                if (email.isDirty && email.isEmail) {
                    return null;
                }
                break;
            default:
                break;
        }

        console.log(searchParameter);
        const data = await fetchSearchUsers(searchParameter, PAGE_FIRST, searchBy);
        return data;
}