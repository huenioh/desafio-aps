import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Definir o esquema Zod
const usuarioSchema = z.object({
    usuario: z.object({
      nome: z.string().min(1, "Por favor, informe um nome válido"),
      nomeFantasia: z.string().optional(),
      cnpj: z.string().min(9, "Por favor, informe um CNPJ válido"),
      email: z.string().email("Por favor, informe um E-mail válido."),
      telefone: z.string().min(15, "Por favor, informe um telefone válido"),
      endereco: z.object({
        cep: z.string().min(9, "Por favor, informe um CEP válido"),
        logradouro: z
          .string()
          .min(1, "Por favor, informe um logradouro válido"),
        bairro: z.string().min(1, "Por favor, informe um bairro válido"),
        cidade: z.string().min(1, "Por favor, informe uma cidade válida"),
        uf: z.string().min(2, "Por favor, informar UF válido").max(2, "Por favor, informar UF válido"),
        complemento: z.string().optional(),
      }),
    }),
  });

type FormData = z.infer<typeof usuarioSchema>;

export function FormComp() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
      resolver: zodResolver(usuarioSchema),
    });
  
    const onSubmit = (data: FormData) => {
      console.log(data);
      onClose();
      reset();
    };

    const onCancel = () => {
        onClose();
        reset();
      };
    
  
    return (
        <>
        <Button onClick={onOpen}>Adicionar Cliente</Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Criar conta de usuário</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.usuario?.nome}>
                  <FormLabel htmlFor="usuario.nome">Nome</FormLabel>
                  <Input id="usuario.nome" placeholder="Nome" {...register('usuario.nome')} />
                  {errors.usuario?.nome && (
                    <FormErrorMessage>{errors.usuario.nome.message}</FormErrorMessage>
                  )}
                </FormControl>
    
                <FormControl isInvalid={!!errors.usuario?.nomeFantasia}>
                  <FormLabel htmlFor="usuario.nomeFantasia">Nome Fantasia (opcional)</FormLabel>
                  <Input id="usuario.nomeFantasia" placeholder="Nome Fantasia" {...register('usuario.nomeFantasia')} />
                </FormControl>
                  
                <FormControl isInvalid={!!errors.usuario?.cnpj}>
                  <FormLabel htmlFor="usuario.cnpj">CNPJ</FormLabel>
                  <Input id="usuario.cnpj" placeholder="CNPJ" {...register('usuario.cnpj')} />
                  {errors.usuario?.cnpj && (
                    <FormErrorMessage>{errors.usuario.cnpj.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.usuario?.email}>
                  <FormLabel htmlFor="usuario.email">E-mail</FormLabel>
                  <Input id="usuario.email" placeholder="E-mail" {...register('usuario.email')} />
                  {errors.usuario?.email && (
                    <FormErrorMessage>{errors.usuario.email.message}</FormErrorMessage>
                  )}
                </FormControl>
                
                <FormControl isInvalid={!!errors.usuario?.telefone}>
                  <FormLabel htmlFor="usuario.telefone">Telefone</FormLabel>
                  <Input id="usuario.telefone" placeholder="Telefone" {...register('usuario.telefone')} />
                  {errors.usuario?.telefone && (
                    <FormErrorMessage>{errors.usuario.telefone.message}</FormErrorMessage>
                  )}
                </FormControl>
                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.cep}>
                  <FormLabel htmlFor="usuario.endereco.cep">Telefone</FormLabel>
                  <Input id="usuario.endereco.cep" placeholder="CEP" {...register('usuario.endereco.cep')} />
                  {errors.usuario?.endereco?.cep && (
                    <FormErrorMessage>{errors.usuario.endereco.cep.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.logradouro}>
                  <FormLabel htmlFor="usuario.endereco.logradouro">Logradouro</FormLabel>
                  <Input id="usuario.endereco.logradouro" placeholder="Logradouro" {...register('usuario.endereco.logradouro')} />
                  {errors.usuario?.endereco?.logradouro && (
                    <FormErrorMessage>{errors.usuario.endereco.logradouro.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.bairro}>
                  <FormLabel htmlFor="usuario.endereco.bairro">Bairro</FormLabel>
                  <Input id="usuario.endereco.bairro" placeholder="Bairro" {...register('usuario.endereco.bairro')} />
                  {errors.usuario?.endereco?.bairro && (
                    <FormErrorMessage>{errors.usuario.endereco.bairro.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.cidade}>
                  <FormLabel htmlFor="usuario.endereco.cidade">Cidade</FormLabel>
                  <Input id="usuario.endereco.cidade" placeholder="Cidade" {...register('usuario.endereco.cidade')} />
                  {errors.usuario?.endereco?.cidade && (
                    <FormErrorMessage>{errors.usuario.endereco.cidade.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.uf}>
                  <FormLabel htmlFor="usuario.endereco.uf">UF</FormLabel>
                  <Input id="usuario.endereco.uf" placeholder="UF" {...register('usuario.endereco.uf')} />
                  {errors.usuario?.endereco?.uf && (
                    <FormErrorMessage>{errors.usuario.endereco.uf.message}</FormErrorMessage>
                  )}
                </FormControl>
                                                                                
                <FormControl isInvalid={!!errors.usuario?.endereco?.complemento}>
                  <FormLabel htmlFor="usuario.endereco.complemento">Complemento</FormLabel>
                  <Input id="usuario.endereco.complemento" placeholder="Complemento" {...register('usuario.endereco.complemento')} />
                </FormControl>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" onClick={handleSubmit(onSubmit)}>
                Salvar
              </Button>
              <Button onClick={onCancel}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  