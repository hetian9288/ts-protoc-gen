import {EnumDescriptorProto} from "google-protobuf/google/protobuf/descriptor_pb";
import {Printer} from "../Printer";
import { throwError } from "../util";

export function printEnum(enumDescriptor: EnumDescriptorProto, indentLevel: number) {
  const printer = new Printer(indentLevel);
  const enumInterfaceName = `${enumDescriptor.getName()}`;
  printer.printEmptyLn();
  printer.printLn(`export enum ${enumInterfaceName} {`);
  enumDescriptor.getValueList().forEach(value => {
    const valueName = value.getName() || throwError("Missing value name");
    printer.printIndentedLn(`${valueName.toUpperCase()}= ${value.getNumber()},`);
  });
  printer.printLn(`}`);
  return printer.getOutput();
}
