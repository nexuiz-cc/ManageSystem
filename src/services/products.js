import instance from "../utils/request";

//获取商品列表
export function findProductsList(page = 1, per = 2) {
  return instance.get("/api/v1/admin/products", { params: { page, per } });
}

//获取商品的详情 id
export function findProductDetail(id) {
  return instance.get("/api/v1/admin/products/" + id);
}

//添加商品
/**
 *
 * @param {
 * name          商品名字
 * descriptions  商品简介
 *  quantity      数量(库存)
 * price         价格
 * coverImg      主图
 * productCategory 商品分类id
 * } data
 * @returns
 */
export function createProduct(data) {
  return instance.post("/api/v1/admin/products", {
    data,
  });
}

/**
 *
 * @param {*} id
 * @param {
 *    name          商品名字
 *    descriptions  商品简介
 *    quantity      数量(库存)
 *     price         价格
 *     coverImg      主图
 *    productCategory 商品分类id
 * } data
 * @returns
 */
//修改一条商品
export function modifyProductOne(id, data) {
  return instance.put("/api/v1/admin/products/" + id, { data });
}

//删除一条商品
export function delProductOne(id) {
  return instance.delete("/api/v1/admin/products" + id);
}
