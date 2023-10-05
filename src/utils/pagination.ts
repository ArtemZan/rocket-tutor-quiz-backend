export type PaginationQuery = {
    page: string
    pageSize: string
}

export function getPaginationOptions(query: PaginationQuery){
    const pageSize = parseInt(query?.pageSize)
    const page = parseInt(query?.page)
    if(isNaN(pageSize) || isNaN(page) || pageSize <= 0 || page < 0){
        return false
    }

    return {
        skip: page * pageSize,
        limit: pageSize
    }
}