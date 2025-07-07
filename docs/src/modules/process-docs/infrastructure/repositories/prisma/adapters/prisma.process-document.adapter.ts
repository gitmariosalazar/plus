import { Prisma } from '@prisma/client';
import { ProcessDocumentResponse } from 'src/modules/process-docs/domain/schemas/dto/response/process-document.response';

type ProcessDocumentsWithRelations = Prisma.ProcessDocumentsGetPayload<{
  include: {
    process: {
      include: {
        status: {
          include: {
            type_status: true;
          };
        };
        entity: true;
      };
    };
    document: {
      include: {
        type_document: true;
        status: {
          include: {
            type_status: true;
          };
        };
      };
    };
  };
}>;
export class PrismaProcessDocumentAdapter {
  static fromProcessDocumentsModelToResponse(
    processDocument: ProcessDocumentsWithRelations,
  ): ProcessDocumentResponse {
    return {
      idProcessDocument: processDocument.id_process_document,
      process: {
        idProcess: processDocument.process.id_process,
        processNumber: processDocument.process.process_number,
        value: Number(processDocument.process.value),
        category: processDocument.process.category,
        description: processDocument.process.description!,
        timeExecution: processDocument.process.time_execution,
        processObject: processDocument.process.process_object,
        emailManager: processDocument.process.email_manager!,
        fullNameManager: processDocument.process.full_name_manager!,
        phoneManager: processDocument.process.phone_manager!,
        statusProcess: processDocument.process.status?.id_status!,
        isActive: processDocument.process.is_active,
        status: {
          idStatus: processDocument.process.status?.id_status!,
          name: processDocument.process.status?.name!,
          description: processDocument.process.status?.description!,
          typeStatus: {
            idTypeStatus:
              processDocument.process.status?.type_status.id_type_status!,
            name: processDocument.process.status?.type_status.name!,
            description:
              processDocument.process.status?.type_status.description!,
          },
        },
        entity: {
          idEntity: processDocument.process.entity.id_entity,
          ruc: processDocument.process.entity.ruc,
          name: processDocument.process.entity.name,
          email: processDocument.process.entity.email,
          cellphone: processDocument.process.entity.cellphone,
          telephone: processDocument.process.entity.telephone,
          address: processDocument.process.entity.address,
          description: processDocument.process.entity.description!,
        },
      },
      document: {
        idDocument: processDocument.document.id_document,
        name: processDocument.document.name,
        description: processDocument.document.description!,
        dateRequest: processDocument.document.date_request!,
        dateReception: processDocument.document.date_reception!,
        managerName: processDocument.document.name_manager!,
        documentUrl: processDocument.document.document_link!,
        status: {
          idStatus: processDocument.document.status.id_status,
          name: processDocument.document.status.name,
          description: processDocument.document.status.description!,
          typeStatus: {
            idTypeStatus:
              processDocument.document.status.type_status.id_type_status,
            name: processDocument.document.status.type_status.name,
            description:
              processDocument.document.status.type_status.description!,
          },
        },
        typeDocument: {
          idTypeDocument:
            processDocument.document.type_document.id_type_document,
          title: processDocument.document.type_document.title,
          description: processDocument.document.type_document.description!,
        },
        process: {
          idProcess: processDocument.process.id_process,
          processNumber: processDocument.process.process_number,
          value: Number(processDocument.process.value),
          category: processDocument.process.category,
          description: processDocument.process.description!,
          timeExecution: processDocument.process.time_execution,
          processObject: processDocument.process.process_object,
          emailManager: processDocument.process.email_manager!,
          fullNameManager: processDocument.process.full_name_manager!,
          phoneManager: processDocument.process.phone_manager!,
          statusProcess: processDocument.process.status?.id_status!,
          isActive: processDocument.process.is_active,
          entity: {
            idEntity: processDocument.process.entity.id_entity,
            ruc: processDocument.process.entity.ruc,
            name: processDocument.process.entity.name,
            email: processDocument.process.entity.email,
            cellphone: processDocument.process.entity.cellphone,
            telephone: processDocument.process.entity.telephone,
            address: processDocument.process.entity.address,
            description: processDocument.process.entity.description!,
          },
          status: {
            idStatus: processDocument.process.status?.id_status!,
            name: processDocument.process.status?.name!,
            description: processDocument.process.status?.description!,
            typeStatus: {
              idTypeStatus:
                processDocument.process.status?.type_status.id_type_status!,
              name: processDocument.process.status?.type_status.name!,
              description:
                processDocument.process.status?.type_status.description!,
            },
          },
          updatedAt: new Date(processDocument.updated_at),
          createdAt: new Date(processDocument.created_at),
        },
      },
      observations: processDocument.observations!,
      createdAt: new Date(processDocument.created_at),
      updatedAt: new Date(processDocument.updated_at),
    };
  }
}
