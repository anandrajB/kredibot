import axios from 'axios';
import Cookies from 'js-cookie';
import combineData from '../utils/Helper';
import BASE_URL from '../utils/Base';


const ChatListData = async () => {
  try {
    const token = 'token 9041fe31da21afc33efb133887a373ebc96e8f89';

    Cookies.set('authToken', token);

    const response = await axios.get(`https://${BASE_URL}/api-auth/user/chat/`, {
      headers: { Authorization: token },
    });

    const baseData = response.data?.data?.[0].chat_users;
    let index = 0;

    // Combine users and party
    return [
      ...combineData(
        baseData?.counterparty_user,
        () => index++,
        (counterparty) => counterparty.party_name,
        (counterparty) => counterparty.users
      ),
      ...combineData(
        baseData?.bank_user,
        () => index++,
        (bank) => bank.bank_name,
        (bank) => bank.users
      ),
      ...combineData(
        baseData?.buyer_user,
        () => index++,
        (buyer) => buyer.party_name,
        (buyer) => buyer.users
      ),
    ];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default ChatListData;
