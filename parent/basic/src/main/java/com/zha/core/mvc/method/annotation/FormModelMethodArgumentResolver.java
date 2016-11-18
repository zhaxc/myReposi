package com.zha.core.mvc.method.annotation;

import com.zha.core.mvc.bind.FormModel;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * Created by java on 2016/11/18.
 */
public class FormModelMethodArgumentResolver implements HandlerMethodArgumentResolver {

    public FormModelMethodArgumentResolver() {
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        if (parameter.hasParameterAnnotation(FormModel.class)) {
            return true;
        }
        return false;
    }

    /**
     * Resolve the argument from the model or if not found instantiate it with
     * its default if it is available. The model attribute is then populated
     * with request values via data binding and optionally validated
     * if {@code @java.validation.Valid} is present on the argument.
     * @throws BindException if data binding and validation result in an error
     * and the next method parameter is not of type {@link Errors}.
     * @throws Exception if WebDataBinder initialization fails.
     */
    @Override
    public final Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        return null;
    }
}
