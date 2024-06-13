const cloudinary = require("../middleware/cloudinary");
const moment = require('moment');

//const { create } = require("../models/Bills");
const Bill = require("../models/Bill");
const List = require("../models/List")

module.exports = {

    //create Bill List (with individual ID)
    //take you to edit page
    //Add individual Bills that correspond to Bill List
    //Bill List has 

    getProfile: async (req,res) => { //get user profile that contains: profile name pic, and link to create bills, and link to existing bills

    try{
        res.render("profile.ejs", {user: req.user})
    } catch (err){
        console.log(err)
    }
        
    },
    getCreateList: async (req,res) => { //get page that edits input for creating New List
        try{
            res.render("createList.ejs")
        } catch (err){
            console.log(err)
        }
    },
    postCreateList: async (req,res) => {  //create A new list with entries. reload to add bills
        try{
            await List.create({
                user: req.user.id,
                Name: req.body.listName,
                Month: req.body.listMonth,
                Year: req.body.listYear
            })

            console.log("List Created")
            res.redirect("/bills/allBillsList")
        } catch (err){
            console.log(err)
        }
    },
    getAllLists: async (req,res) =>{ // get all Lists with bills attached to lists
        try{

            const billList = await List.find({user:req.user.id}).sort({createdAt: "desc"})
            console.log(billList)

            res.render("allLists.ejs", {List: billList})
        } catch (err){
            console.log(err)
        }
    },
    getAddBills: async (req,res) => {
        try{
            const list = await List.findOne({_id:req.params.id})
            console.log(list)

            const bills = await Bill.find({ListId: req.params.id})
            console.log(bills)

            ///Format Date and insert into array
            const formatDate = (dateString) => {
                return moment(dateString).format('MMMM D, YYYY');
              };

              let dueDates = [];
              let datePaid = [];
              
              for(i=0;i<bills.length;i++){
                dueDates.push(formatDate(bills[i].DueDate))
                datePaid.push(formatDate(bills[i].DatePaid))
              }
              console.log(dueDates)
              console.log(datePaid)

            res.render("createBill.ejs",{list:list, bills:bills, dueDates:dueDates, datePaid:datePaid})
        } catch (err){
            console.log(err)
        }
    },
    postAddBills: async (req,res) => {
        try{
            
            await Bill.create ({
                Name: req.body.Name,
                TotalBalance: req.body.TotalBalance,
                Cost: req.body.Cost,
                DueDate: req.body.DueDate,
                AmountPaid: req.body.AmountPaid,
                DatePaid: req.body.DatePaid,
                RemainingBalance: req.body.RemainingBalance,
                ListId: req.params.id,
                user: req.user.id



            })
            console.log("Bill Added")
            res.redirect(`/bills/newBill/${req.params.id}`)
        } catch (err){
            console.log(err)
        }
    },
    getViewList: async (req,res) => {

        try{
            const list = await List.findOne({_id:req.params.id})
            console.log(list)

            const bills = await Bill.find({ListId: req.params.id})
            console.log(bills)

            ///Format Date and insert into array
            const formatDate = (dateString) => {
                return moment(dateString).format('MMMM D, YYYY');
              };

              let dueDates = [];
              let datePaid = [];
              
              for(i=0;i<bills.length;i++){
                dueDates.push(formatDate(bills[i].DueDate))
                datePaid.push(formatDate(bills[i].DatePaid))
              }
              console.log(dueDates)
              console.log(datePaid)
            
            
            
            
            res.render("viewBill.ejs",{list:list, bills:bills, dueDates:dueDates, datePaid:datePaid})
            console.log()
        }catch (err){
            vonsole.log(err)
    }


    },
    getEditList: async (req,res) => {
        try{

            const list = await List.findOne({_id:req.params.id})
            console.log(list)

            const bills = await Bill.find({ListId: req.params.id})
            console.log(bills)

            ///Format Date and insert into array
            const formatDate = (dateString) => {
                return moment(dateString).format('MMMM D, YYYY');
              };

              let dueDates = [];
              let datePaid = [];
              
              for(i=0;i<bills.length;i++){
                dueDates.push(formatDate(bills[i].DueDate))
                datePaid.push(formatDate(bills[i].DatePaid))
              }

              


            res.render("editBill.ejs", {list:list, bills:bills, dueDates:dueDates, datePaid:datePaid})

        }catch (err){
            console.log(err)
        }
    },
    putEditBill: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, balance, cost, dueDate, paid, datePaid, remaining, listId} = req.body;

            if(name){
                await Bill.findByIdAndUpdate(id, {
                    Name: name
            })
            }

            if(balance){
                await Bill.findByIdAndUpdate(id, {
                    TotalBalance: balance
            })
            }
            
            if(cost){
                await Bill.findByIdAndUpdate(id, {
                    Cost: cost
            })
            }

            if(dueDate){
                await Bill.findByIdAndUpdate(id, {
                    DueDate: new Date(dueDate)
            })
            }

            if(paid){
                await Bill.findByIdAndUpdate(id, {
                    AmountPaid: paid
            })
            }

            if(datePaid){
                await Bill.findByIdAndUpdate(id, {
                    DatePaid: new Date(datePaid)
            })
            }

            if(remaining){
                await Bill.findByIdAndUpdate(id, {
                    RemainingBalance: remaining
            })
            }

          // await Bill.findByIdAndUpdate(id, {
          //     Name: name,
          //     TotalBalance: balance,
          //     Cost: cost,
          //     DueDate: new Date(dueDate),
          //     AmountPaid: paid,
          //     DatePaid: new Date(datePaid),
          //     RemainingBalance: remaining
          // });

            res.redirect(`/bills/editList/${listId}`);
        } catch (err) {
            console.log(err);
        }
    }
};