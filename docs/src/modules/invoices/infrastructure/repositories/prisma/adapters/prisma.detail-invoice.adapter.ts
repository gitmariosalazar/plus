import { Prisma } from '@prisma/client';
import { DetailInvoiceResponse } from 'src/modules/invoices/domain/schemas/dto/response/detail-invoice.response';

type DetailInvoiceWithRelations = Prisma.DetailInvoiceGetPayload<{
  include: {
    process: {
      include: {
        entity: true;
        status: {
          include: {
            type_status: true;
          };
        };
      };
    };
    entity: true;
    pay_type: true;
    document: {
      include: {
        type_document: true;
        process: {
          include: {
            entity: true;
            status: {
              include: {
                type_status: true;
              };
            };
          };
        };
      };
    };
    status: {
      include: {
        type_status: true;
      };
    };
  };
}>;

export class PrismaDetailInvoiceAdapter {
  static fromDetailInvoiceWithRelationsToDetailInvoiceResponse(
    detailInvoice: DetailInvoiceWithRelations,
  ): DetailInvoiceResponse {
    return {
      idDetailInvoice: detailInvoice.id_detail_invoice,
      process: {
        idProcess: detailInvoice.process.id_process,
        processNumber: detailInvoice.process.process_number,
        value: Number(detailInvoice.process.value),
        category: detailInvoice.process.category,
        description: detailInvoice.process.description!,
        timeExecution: detailInvoice.process.time_execution,
        processObject: detailInvoice.process.process_object,
        emailManager: detailInvoice.process.email_manager!,
        fullNameManager: detailInvoice.process.full_name_manager!,
        phoneManager: detailInvoice.process.phone_manager!,
        statusProcess: detailInvoice.process.status_process,
        isActive: detailInvoice.process.is_active,
        entity: {
          idEntity: detailInvoice.process.entity.id_entity,
          ruc: detailInvoice.process.entity.ruc,
          name: detailInvoice.process.entity.name,
          email: detailInvoice.process.entity.email,
          cellphone: detailInvoice.process.entity.cellphone,
          telephone: detailInvoice.process.entity.telephone,
          address: detailInvoice.process.entity.address,
          description: detailInvoice.process.entity.description!,
        },
        status: {
          idStatus: detailInvoice.process.status?.id_status!,
          name: detailInvoice.process.status?.name!,
          description: detailInvoice.process.status?.description!,
          typeStatus: {
            idTypeStatus:
              detailInvoice.process.status?.type_status.id_type_status!,
            name: detailInvoice.process.status?.type_status.name!,
            description: detailInvoice.process.status?.type_status.description!,
          },
        },
        createdAt: detailInvoice.process.created_at,
        updatedAt: detailInvoice.process.updated_at,
      },
      totalValue: Number(detailInvoice.total_value),
      invoiceNumber: detailInvoice.invoice_number,
      entity: {
        idEntity: detailInvoice.entity.id_entity,
        ruc: detailInvoice.entity.ruc,
        name: detailInvoice.entity.name,
        email: detailInvoice.entity.email,
        cellphone: detailInvoice.entity.cellphone,
        telephone: detailInvoice.entity.telephone,
        address: detailInvoice.entity.address,
        description: detailInvoice.entity.description!,
      },
      description: detailInvoice.description!,
      emissionDate: detailInvoice.emission_date!,
      expirationDate: detailInvoice.expiration_date!,
      emailResponsability: detailInvoice.email_responsibility!,
      typePayment: {
        idTypePayment: detailInvoice.pay_type.id_pay_type,
        name: detailInvoice.pay_type.name,
        description: detailInvoice.pay_type.description!,
      },
      document: {
        idDocument: detailInvoice.document.id_document,
        name: detailInvoice.document.name,
        description: detailInvoice.document.description!,
        dateRequest: detailInvoice.document.date_request!,
        dateReception: detailInvoice.document.date_reception!,
        managerName: detailInvoice.document.name_manager!,
        documentUrl: detailInvoice.document.document_link!,
        status: {
          idStatus: detailInvoice.document.process.status?.id_status!,
          name: detailInvoice.document.process.status?.name!,
          description: detailInvoice.document.process.status?.description!,
          typeStatus: {
            idTypeStatus:
              detailInvoice.document.process.status?.type_status
                .id_type_status!,
            name: detailInvoice.document.process.status?.type_status.name!,
            description:
              detailInvoice.document.process.status?.type_status.description!,
          },
        },
        typeDocument: {
          idTypeDocument: detailInvoice.document.type_document.id_type_document,
          title: detailInvoice.document.type_document.title,
          description: detailInvoice.document.type_document.description!,
        },
        process: {
          idProcess: detailInvoice.document.process.id_process,
          processNumber: detailInvoice.document.process.process_number,
          value: Number(detailInvoice.document.process.value),
          category: detailInvoice.document.process.category,
          description: detailInvoice.document.process.description!,
          timeExecution: detailInvoice.document.process.time_execution,
          processObject: detailInvoice.document.process.process_object,
          emailManager: detailInvoice.document.process.email_manager!,
          fullNameManager: detailInvoice.document.process.full_name_manager!,
          phoneManager: detailInvoice.document.process.phone_manager!,
          statusProcess: detailInvoice.document.process.status_process,
          isActive: detailInvoice.document.process.is_active,
          entity: {
            idEntity: detailInvoice.document.process.entity.id_entity,
            ruc: detailInvoice.document.process.entity.ruc,
            name: detailInvoice.document.process.entity.name,
            email: detailInvoice.document.process.entity.email,
            cellphone: detailInvoice.document.process.entity.cellphone,
            telephone: detailInvoice.document.process.entity.telephone,
            address: detailInvoice.document.process.entity.address,
            description: detailInvoice.document.process.entity.description!,
          },
          status: {
            idStatus: detailInvoice.document.process.status?.id_status!,
            name: detailInvoice.document.process.status?.name!,
            description: detailInvoice.document.process.status?.description!,
            typeStatus: {
              idTypeStatus:
                detailInvoice.document.process.status?.type_status
                  .id_type_status!,
              name: detailInvoice.document.process.status?.type_status.name!,
              description:
                detailInvoice.document.process.status?.type_status.description!,
            },
          },
          createdAt: detailInvoice.document.process.created_at,
          updatedAt: detailInvoice.document.process.updated_at,
        },
      },
      status: {
        idStatus: detailInvoice.status.id_status,
        name: detailInvoice.status.name,
        description: detailInvoice.status.description!,
        typeStatus: {
          idTypeStatus: detailInvoice.status.type_status.id_type_status,
          name: detailInvoice.status.type_status.name,
          description: detailInvoice.status.type_status.description!,
        },
      },
      createdAt: detailInvoice.created_at,
      updatedAt: detailInvoice.updated_at,
    };
  }
}
