package com.meditrak.service;

import com.meditrak.dto.HospitalForm;
import com.meditrak.dto.RouteOptimizationRequest;
import com.meditrak.dto.WasteEntryForm;
import com.meditrak.model.Hospital;
import com.meditrak.model.RoutePlan;
import com.meditrak.model.WasteEntry;
import com.meditrak.repository.HospitalRepository;
import com.meditrak.repository.RouteRepository;
import com.meditrak.repository.WasteRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class MediTrackService {
    private final HospitalRepository hospitalRepository;
    private final WasteRepository wasteRepository;
    private final RouteRepository routeRepository;

    public MediTrackService(HospitalRepository hospitalRepository, WasteRepository wasteRepository, RouteRepository routeRepository) {
        this.hospitalRepository = hospitalRepository;
        this.wasteRepository = wasteRepository;
        this.routeRepository = routeRepository;
    }

    public List<Hospital> getHospitals() {
        return hospitalRepository.findAll();
    }

    public void registerHospital(HospitalForm form) {
        hospitalRepository.save(form);
    }

    public void addWaste(WasteEntryForm form) {
        wasteRepository.save(form);
    }

    public List<WasteEntry> getWasteEntries() {
        return wasteRepository.findAll();
    }

    public List<RoutePlan> getRoutes() {
        return routeRepository.findAll();
    }

    public List<RoutePlan> optimizeRoutes(RouteOptimizationRequest request) {
        return routeRepository.findByZone(request.getZone());
    }

    public Map<String, Object> dashboardSummary() {
        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("hospitalCount", hospitalRepository.findAll().size());
        summary.put("wasteEntries", wasteRepository.findAll().size());
        summary.put("routes", routeRepository.findAll().size());
        summary.put("northZoneWasteKg", wasteRepository.totalWasteByZone("North"));
        return summary;
    }
}
