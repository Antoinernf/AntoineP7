export const nameStorage = () => {
        return JSON.parse(localStorage.getItem('userLogin')).username === undefined || JSON.parse(localStorage.getItem('userLogin')).username === null ? false: true;
      };
      
      