import { useCommonCache } from "@/store/index.js"

export default function(moduleName) {
    const commonCache = useCommonCache()

    let arr = commonCache.temporaryModulePermission
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].url === moduleName && arr[i].check) {
            return true
        }
    }
    return false
}
