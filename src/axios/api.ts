import axios from "axios";

const API_BASE_URL = "https://www.kobis.or.kr/kobisopenapi/webservice/rest";
const API_KEY = "6ff38d476bf61f7c2e091f00322fa0ae"; // 여기에 API 키를 입력하세요.

export const fetchDailyBoxOffice = async (date: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/boxoffice/searchDailyBoxOfficeList.json`,
    {
      params: {
        key: API_KEY,
        targetDt: date,
      },
    }
  );
  return response.data.boxOfficeResult.dailyBoxOfficeList;
};
