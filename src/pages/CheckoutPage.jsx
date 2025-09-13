import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useViaCEP, maskCEP, normalizeCEP } from "@/hooks/useViaCEP";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  const frete = 0; 
  const total = useMemo(() => subtotal + frete, [subtotal, frete]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      paymentMethod: "pix",
    },
  });

  const { fetchCEP, loading: loadingCEP } = useViaCEP();
  const cepValue = watch("cep");

 
  useEffect(() => {
    const masked = maskCEP(cepValue ?? "");
    if ((cepValue ?? "") !== masked) {
      setValue("cep", masked, { shouldDirty: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepValue]);

  
  async function handleCEPQuery() {
    const raw = normalizeCEP(cepValue ?? "");
    if (raw.length !== 8) return;
    const { data, error } = await fetchCEP(raw);
    if (error) {
      setError("cep", { type: "manual", message: error });
      return;
    }
    clearErrors("cep");
    if (data) {
      setValue("street", data.logradouro ?? "");
      setValue("district", data.bairro ?? "");
      setValue("city", data.localidade ?? "");
      setValue("state", data.uf ?? "");
      if (data.complemento) setValue("complement", data.complemento);
    }
  }

  async function onSubmit(values) {
    if (!items.length) {
      toast.warning('Seu carrinho está vazio.')
      return;
    }
    if (normalizeCEP(values.cep).length !== 8) {
      setError("cep", { type: "manual", message: "Informe um CEP válido (8 dígitos)." });
      return;
    }
    toast.success('Pedido Realizado com sucesso')
    clear();
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] py-8">
      <div className="container max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
   
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seus dados</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  {...register("name", { required: "Informe seu nome completo." })}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@email.com"
                  {...register("email", {
                    required: "Informe seu e-mail.",
                    pattern: { value: /\S+@\S+\.\S+/, message: "E-mail inválido." },
                  })}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(DDD) 99999-9999"
                  {...register("phone", {
                    required: "Informe seu telefone.",
                    minLength: { value: 10, message: "Telefone muito curto." },
                  })}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="document">CPF/CNPJ (opcional)</Label>
                <Input id="document" placeholder="Somente números" {...register("document")} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endereço de entrega</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="cep">CEP</Label>
                <div className="flex gap-2">
                  <Input
                    id="cep"
                    inputMode="numeric"
                    placeholder="00000-000"
                    {...register("cep", {
                      required: "Informe o CEP.",
                      validate: (v) =>
                        normalizeCEP(v).length === 8 || "CEP inválido — preencha 8 dígitos.",
                    })}
                    onBlur={handleCEPQuery}
                  />
                  <Button type="button" variant="secondary" onClick={handleCEPQuery} disabled={loadingCEP}>
                    {loadingCEP ? <Loader2 className="animate-spin size-4" /> : "Buscar CEP"}
                  </Button>
                </div>
                {errors.cep && <p className="mt-1 text-xs text-red-600">{errors.cep.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  placeholder="Logradouro"
                  {...register("street", { required: "Informe a rua (logradouro)." })}
                />
                {errors.street && <p className="mt-1 text-xs text-red-600">{errors.street.message}</p>}
              </div>

              <div>
                <Label htmlFor="number">Número</Label>
                <Input id="number" placeholder="Nº" {...register("number", { required: "Informe o número." })} />
                {errors.number && <p className="mt-1 text-xs text-red-600">{errors.number.message}</p>}
              </div>

              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input id="complement" placeholder="Apto, bloco, ref." {...register("complement")} />
              </div>

              <div>
                <Label htmlFor="district">Bairro</Label>
                <Input id="district" placeholder="Bairro" {...register("district", { required: "Informe o bairro." })} />
                {errors.district && <p className="mt-1 text-xs text-red-600">{errors.district.message}</p>}
              </div>

              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="Cidade" {...register("city", { required: "Informe a cidade." })} />
                {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
              </div>

              <div>
                <Label htmlFor="state">UF</Label>
                <Input
                  id="state"
                  placeholder="UF"
                  maxLength={2}
                  {...register("state", {
                    required: "Informe a UF.",
                    validate: (v) => /^[A-Za-z]{2}$/.test(v) || "UF inválida — use duas letras, ex.: PB, SP.",
                  })}
                />
                {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>}
              </div>

              <div className="md:col-span-4">
                <Label htmlFor="notes">Observações (opcional)</Label>
                <Textarea id="notes" placeholder="Alguma referência de entrega?" {...register("notes")} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2 rounded-md border p-3 cursor-pointer">
                <input type="radio" value="pix" {...register("paymentMethod")} defaultChecked />
                <span>Pix</span>
              </label>
              <label className="flex items-center gap-2 rounded-md border p-3 cursor-pointer">
                <input type="radio" value="card" {...register("paymentMethod")} />
                <span>Cartão</span>
              </label>
            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : "Finalizar pedido"}
              </Button>
            </CardFooter>
          </Card>
        </form>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">Seu carrinho está vazio.</p>
              ) : (
                items.map((i) => (
                  <div key={`${i.id}-${i.size ?? ""}`} className="flex items-center gap-3">
                    <img src={i.image} alt={i.title} className="h-14 w-14 rounded-md object-container border" />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{i.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {i.size ? `Tamanho ${i.size} • ` : ""}
                        Qtd: {i.qty}
                      </p>
                    </div>
                    <div className="text-sm font-semibold">R$ {(i.price * i.qty).toFixed(2)}</div>
                  </div>
                ))
              )}

              <Separator />
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frete</span>
                <span className="font-medium">{frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold">R$ {total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
