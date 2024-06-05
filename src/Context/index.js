import React from 'react'

const AppContext = React.createContext()


function ProviderContext(props){
    /* ESTADOS */

    let [data,setData] = React.useState(null);
    let [rol,setRol] = React.useState(null);

    /* modules */

    let [modelsFile,setModelsFile] = React.useState(null);

    /* oneDrive Data */

    let [userData,setUserData] = React.useState(null);

    let [token,setToken] = React.useState(null);

    let [indexFile,setIndexFile] = React.useState(null);


    /* CONTEXT DEMO */

    let [categories,setCategories] = React.useState([]);
    let [documents,setDocuments] =  React.useState({});
    let [selectCategory,setSelectCategory] = React.useState([]);

    return (
        <AppContext.Provider value={{data,setData,
        modelsFile,setModelsFile,userData,setUserData,token,setToken,rol,setRol,
        indexFile,setIndexFile,categories,setCategories,documents,setDocuments,selectCategory,setSelectCategory}}>
            {props.children}
        </AppContext.Provider>
    )
}

export {ProviderContext,AppContext};