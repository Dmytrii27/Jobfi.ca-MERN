import axios from "axios";
// const API_URL = "http://localhost:8800/api-v1";//
const API_URL = "https://jobfi-ca-mern.onrender.com/api-v1";

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

// Оновлена функція apiRequest з додатковими перевірками та логуванням
export const apiRequest = async ({ url, token, data, method }) => {
  try {
    // Робимо запит до API
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    // Додаємо перевірку, чи існує властивість `data`
    if (result && result.data) {
      console.log('Result:', result); // Логування результату для дебагу
      return result.data; // Повертаємо дані лише якщо існує data
    } else {
      throw new Error("Відповідь не містить data"); // Викидаємо помилку, якщо `data` відсутнє
    }

  } catch (error) {
    // Перевіряємо, чи існує об'єкт error.response
    const err = error.response?.data || { success: false, message: 'Невідома помилка' };
    console.log('Error response:', error.response); // Логування помилки для дебагу
    return { status: err.success, message: err.message }; // Повертаємо повідомлення про помилку
  }
};

// Функція для завантаження файлу
export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "jobfinder");

  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dax4ymlan/image/upload', formData);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

// Функція для оновлення URL з параметрами пошуку
export const updateURL = ({
  pageNum,
  query,
  cmpLoc,
  sort,
  navigate,
  location,
  jType,
  exp,
}) => {
  const params = new URLSearchParams();

  if (pageNum && pageNum > 1) {
    params.set("page", pageNum);
  }

  if (query) {
    params.set("search", query);
  }

  if (cmpLoc) {
    params.set("location", cmpLoc);
  }

  if (sort) {
    params.set("sort", sort);
  }

  if (jType) {
    params.set("jtype", jType);
  }

  if (exp) {
    params.set("exp", exp);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });

  return newURL;
};

