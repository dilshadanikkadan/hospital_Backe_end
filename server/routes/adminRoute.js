import express from 'express';
import {
    admin_login, getAllLcense,
    userAnalytics,
    profitAnalystics,
    addBanner,
    updateBanner,
    getBanner,
    addSpecialities,
    getSpecialities,
    deleteSpecialities,
    verifyApplicationDoctor, sendInvoice, deleteLicense, addLicenses, getAllUsers, singleUser, pendingDoctorRequest, singlePedingDoctor, deleteUser, blockUser, unBlock
} from '../controller/adminController.js';
import { verifyAdmin, verifyDoctor, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();




router.post("/admin_login", admin_login)
router.get("/get_users", getAllUsers)
router.get("/get_pendingDoctorRequest", verifyAdmin, pendingDoctorRequest)
router.get("/get_singlePedingDoctor/:doctorId", singlePedingDoctor)
router.get("/single_user/:userId", singleUser)
router.post('/block_user', verifyAdmin, blockUser)
router.post('/unblock_user', verifyAdmin, unBlock)
router.delete("/delete_user/:userId", verifyAdmin, deleteUser)
router.post('/add_licenses', verifyAdmin, addLicenses)
router.post('/delete_license', verifyAdmin, deleteLicense)
router.get('/get_allLicenses', verifyAdmin, getAllLcense);
router.get('/getUser_analytics', userAnalytics)
router.get('/getDoctors_Profilts', profitAnalystics)

router.post('/verifyApplicationDoctor', verifyApplicationDoctor);
router.post('/add_banner', addBanner)
router.post('/update_banner', updateBanner)
router.get('/get_banners', getBanner)
router.get('/get_specialities', getSpecialities)
router.delete('/delete_specialities/:id', deleteSpecialities)
router.post('/add_specialities',addSpecialities)
// sednign invoice to admin
router.post('/send_invoice', sendInvoice)

router.get("/test", (re, res) => {
    res.json('gey')
})

export default router;