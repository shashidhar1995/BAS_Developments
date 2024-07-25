sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel"   
],    function (Controller, Filter, FilterOperator, Filtertype, JSONModel) {
        "use strict";
        return Controller.extend("app.project1.controller.View1", {
            onListPress: function (oEvent) {
                var orderId = oEvent.getParameter("listItem").getBindingContext().getProperty("OrderID");
                var oFilter = new Filter("OrderID", FilterOperator.EQ, orderId);
                this.getView().byId("orderTable").getBinding("items").filter(oFilter, Filtertype.Application);
                this.getSplitContobj().to(this.createId("orderDetail"));  
            },onPressOrderDetail: function (oEvent) {
                var that = this;
                var productID = oEvent.getSource().getBindingContext().getProperty("ProductID");
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products(" + productID + ")", {
                    success: function (oData) {
                    var json = new JSONModel(oData);
                        that.getView().byId("productForm").setModel(json);
                        that.getSplitContobj().to(that.createId("proDetail"));
                    },error:function(oError){console.log(oError);
                    }})},
                    getSplitContobj:function(){
                var result = this.byId("splitID");
                return result;
            },OnPressBack:function(){
             this.getSplitContobj().backDetail();
            }
            // onListPress: function(oEvent) {
            //     var listItem = oEvent.getParameter("listItem");   
            //     if (listItem) {
            //         var orderId = listItem.getBindingContext().getProperty("OrderID");
            //         var oFilter = new Filter("OrderID", FilterOperator.EQ, orderId);    
            //         this.getView().byId("orderTable").getBinding("items").filter(oFilter,Filtertype.Application);
            //     } else {
            //         console.error("ListItem is undefined in onListPress handler.");
            //     }
            // }
        });
    });
