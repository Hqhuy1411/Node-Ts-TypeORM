import { Request } from "express"

interface PaginationInfo {
    currentPage: number,          // So trang hien tai
    pageSize: number,              // so luong ban ghi tren 1 trang
    totalItems: number,             // Tong ban ghi
    totalPages: number,             // Tong trang
    hasNext: boolean,
    hasPrevious: boolean
}
export class Paginator {
    static async paginate(queryBuilder, req: Request) {
        let page = Number(req.query.page) || 1
        let item = Number(req.query.pageSize) || 10
        const offset = (page - 1) * item

        const records = await queryBuilder.skip(offset).take(item).getMany()
        const totalItems = await queryBuilder.getCount()

        const totalPages = Math.ceil(totalItems / item)
        const currentPage = offset / item + 1
        const hasNext = currentPage < totalPages
        const hasPrevious = currentPage > 1

        const pagination: PaginationInfo={
            currentPage:page,
            pageSize: item,
            totalItems,
            totalPages,
            hasNext,
            hasPrevious,
        }
        return {records , pagination}
    }
}