import { Request, Response, NextFunction } from 'express';
import catchAsync from '../uitils/catchAsync';
import AppError from '../uitils/appError';

export const getAll = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    let filter = req.filterOptions ? req.filterOptions : {};

    const doc = await Model.find(filter);

    res.status(200).json({
      status: 'success',
      results: doc.length,
      doc,
    });
  });

export const getOne = (Model: any, popOptions?: any) =>
  catchAsync(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { id } = req.params;
      let query = Model.findById(id);

      if (popOptions) {
        query = query.populate(popOptions);
      }

      const doc = await query;

      if (!doc) {
        return next(new AppError('No document with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        doc,
      });
    }
  );

export const createOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      doc,
    });
  });

export const updateOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const deleteOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: doc,
    });
  });
