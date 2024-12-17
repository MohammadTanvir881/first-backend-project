
import catchAsync from '../utitls/catchAsync';
import { AdminServices } from './admin.service';

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Admin is retrieved Successfully',
    res: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  res.status(200).json({
    success: true,
    message: 'Admins is retrieved Successfully',
    res: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  res.status(200).json({
    success: true,
    message: 'Admin are updated Successfully',
    res: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  res.status(200).json({
    success: true,
    message: 'Admin is deleted Successfully',
    res: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
