

import { setState } from "./state.js";
import { fetchProfileData, fetchPostsData } from "./apiService.js";

export const handleTabClick = async function (tabId) {

    setState({
        activeTab: tabId,
        isLoading: true,
        error: null
    })

    if (tabId === 'profile' || tabId === 'posts') {

        let fetchDataPromise;

        if (tabId === 'profile') {

            fetchDataPromise = fetchProfileData();


        } else {
            fetchDataPromise = fetchPostsData()
        }

        try {

            const resultData = await fetchDataPromise;

            setState({

                isLoading: false,
                data: resultData,
                error: null

            })

        }

        catch (error) {

            setState({

                isLoading: false,
                data: {},
                error: error.message

            })

        }



    }

    else {
        setState({
            activeTab: tabId,
            isLoading: false,
            error: null
        })
    }

}